package com.seegene.main.global.aop;


import com.google.gson.Gson;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;
import org.springframework.web.util.WebUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;

import static org.apache.tomcat.util.http.fileupload.FileUploadBase.CONTENT_DISPOSITION;
import static org.apache.tomcat.util.http.fileupload.FileUploadBase.MULTIPART;

@Slf4j
@Component
public class PrefixFilter implements Filter {

    private static final String FILENAME_KEY = "filename=";
    private static final String CONTENT_TYPE = "content-type";
    private static final String ACCEPT = "accept";
    private static final String TEXT = "text";
    private final Gson gson = new Gson();
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        ContentCachingRequestWrapper requestWrapper = new ContentCachingRequestWrapper((HttpServletRequest) request);
        ContentCachingResponseWrapper responseWrapper = new ContentCachingResponseWrapper((HttpServletResponse) response);
        chain.doFilter(requestWrapper, responseWrapper);

        String contentType = (String) getHeaders(req).get(CONTENT_TYPE);
        String acceptHeader = (String) getHeaders(req).get(ACCEPT);


        // disabled log.
        if(req.getRequestURI().contains("/swagger-ui/") || req.getRequestURI().contains("/v3/api-docs/") || req.getRequestURI().contains("/actuator")){
            getParams(req);
            getResponseBody(responseWrapper);
        }else {
        log.info(String.format("[Request] %s:%s, content-type:%s, accept-header:%s", req.getMethod(), req.getRequestURI(), contentType, acceptHeader));
        log.info(String.format("[Params] - %s", getParams(req)));
        try{
            if(contentType!=null) {
                if (Objects.requireNonNull(contentType).startsWith(TEXT) || contentType.equals(MediaType.APPLICATION_JSON_VALUE)) {
                    log.info(String.format("[Body(text/json)] - %s", getRequestTextBody(req)));
                } else if (Objects.requireNonNull(contentType).startsWith(MULTIPART)) {
                    log.info(String.format("[Body(file/image)] - %s", getRequestMultiBody(req.getParts())));
                }
            }
            log.info(String.format("[Response] - status:%s %s", responseWrapper.getStatus(), getResponseBody(responseWrapper)));
        }catch (IOException | ServletException e){
            log.error("REQUEST INPUT STREAM READ ERROR");
            log.error(e.getMessage(), e);
        }
        }
    }

    private Map<Object, Object> getHeaders(HttpServletRequest request) {
        Map<Object, Object> headerMap = new HashMap<>();
        Enumeration<String> headerArray = request.getHeaderNames();
        while (headerArray.hasMoreElements()) {
            String headerName = headerArray.nextElement();
            headerMap.put(headerName, request.getHeader(headerName));
        }
        return headerMap;
    }

    private Object getParams(HttpServletRequest request) {
        Map<String, String[]> parameterMap = request.getParameterMap();
        Map<String, String> resultMap = new HashMap<>();
        for(String key : parameterMap.keySet()){
            String value = parameterMap.get(key)[0];
            resultMap.put(key, value);
        }
        return gson.toJsonTree(resultMap).getAsJsonObject();
    }

    private String extractFilename(String contentDisposition) {
        if (contentDisposition == null) {
            return null;
        }
        int startIndex = contentDisposition.indexOf(FILENAME_KEY);
        if (startIndex == -1) {
            return null;
        }
        String filename = contentDisposition.substring(startIndex + FILENAME_KEY.length());
        if (filename.startsWith("\"")) {
            int endIndex = filename.indexOf("\"", 1);
            if (endIndex != -1) {
                return filename.substring(1, endIndex);
            }
        }
        else {
            int endIndex = filename.indexOf(";");
            if (endIndex != -1) {
                return filename.substring(0, endIndex);
            }
        }
        return filename;
    }

    private List<Object> getRequestMultiBody(Collection<Part> parts) {
        List<Object> resultFile = new ArrayList<>();
        for (Part part : parts) {
            Map<String,String> file = new HashMap<>();
            String filename = extractFilename(part.getHeader(CONTENT_DISPOSITION));
            if (filename != null) {
                file.put("filename",filename);
            }
            else {
                file.put("filename",part.getName());
            }
            file.put("file-type",part.getHeader(CONTENT_TYPE));
            resultFile.add(gson.toJsonTree(file).getAsJsonObject());
        }
        return resultFile;
    }

    private String getRequestTextBody(HttpServletRequest request) throws IOException {
        ServletInputStream inputStream = request.getInputStream();
        byte[] rawData = StreamUtils.copyToByteArray(inputStream);
        String result = new String(rawData);
        return "".equals(result) ? " - " : result;
    }

    private String getResponseBody(final HttpServletResponse response) throws IOException {
        String payload = null;
        ContentCachingResponseWrapper wrapper =
                WebUtils.getNativeResponse(response, ContentCachingResponseWrapper.class);
        if (wrapper != null) {
            byte[] buf = wrapper.getContentAsByteArray();
            if (buf.length > 0) {
                payload = new String(buf, 0, buf.length, StandardCharsets.UTF_8);
                wrapper.copyBodyToResponse();
            }
        }
        return null == payload ? " - " : payload;
    }
}