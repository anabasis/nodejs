package com.seegene.main.global.util.file;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Objects;

@Slf4j
@Component
public class FileUtils {


    private final String filePath = "/Users/mz01-yuseungyeop/Desktop/seegene/upload-file/";// 임시 파일위치


    public File multipartFileToFile(MultipartFile multipartFile) {
        //폴더 존재 확인
        isExistsFolder();
        File saveFile = new File(filePath, Objects.requireNonNull(multipartFile.getOriginalFilename()));
        try {
            multipartFile.transferTo(saveFile);
            log.info("Upload File Name: " + multipartFile.getOriginalFilename());
            log.info("Upload File Size: " + multipartFile.getSize());
        }catch(IllegalStateException | IOException e){
            throw new RuntimeException(e.getMessage(),e);
        }
        return saveFile;
    }
    public void uploadByteFile(byte[] byteFile, String fileName) {
        //폴더 존재 확인
        isExistsFolder();
        File myFile = new File(filePath +fileName);
        try {
            OutputStream os = new FileOutputStream(myFile);
            os.write(byteFile);
            os.close();
            log.info("Upload File Name: " + fileName);
        }catch(IllegalStateException | IOException e){
            throw new RuntimeException(e.getMessage(),e);
        }
    }

    public void isExistsFolder() {
        File fileFolder = new File(filePath);
        if(!fileFolder.exists()){
            if(!fileFolder.mkdir()) {
                log.debug("[file.mkdir]: Success");
            }
        }
    }
}
