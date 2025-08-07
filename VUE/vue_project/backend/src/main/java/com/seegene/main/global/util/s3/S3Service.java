package com.seegene.main.global.util.s3;

import com.seegene.main.domain.common.entity.TsyFl;
import com.seegene.main.global.convert.DefaultDateTimeConverter;
import com.seegene.main.global.dto.S3FileDto;
import com.seegene.main.global.dto.S3ResponseFileDto;
import com.seegene.main.global.util.file.FileUtils;
import com.seegene.main.global.util.props.AwsProperties;
import com.seegene.main.global.util.s3.constant.Bucket;
import com.seegene.main.global.util.s3.constant.StogTpCd;
import jakarta.annotation.Nonnull;
import jakarta.servlet.ServletOutputStream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;


import java.io.InputStream;
import java.time.Duration;
import java.time.LocalDate;
import java.util.UUID;
import java.util.zip.ZipOutputStream;

import static com.seegene.main.global.util.s3.constant.Bucket.getBucketCode;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3Service {

  private final S3Client s3Client;
  private final S3Presigner s3Presigner;
  private final FileUtils fileUtils;
  private final AwsProperties awsProperties;
  private static final String REGEX = "F-";

  public S3FileDto upload(@Nonnull Bucket bucket,  @Nonnull final MultipartFile multipartFile){

    String originalFileName = multipartFile.getOriginalFilename();
    String uploadFileName = originalFileName;
    String uploadFilePath = "test/" + getFolderName() + "/" + UUID.randomUUID()+REGEX+originalFileName;

    PutObjectRequest putObjectRequest = getPutObjectRequest(bucket, uploadFilePath);
    try{
      s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(multipartFile.getInputStream(), multipartFile.getSize()));
    } catch (Exception e) {
      log.error("save file error {}", e.getMessage(), e);
    }
    return new S3FileDto(originalFileName, uploadFileName, uploadFilePath, getUrl(bucket, uploadFilePath));
  }

  public S3ResponseFileDto download(@Nonnull Bucket bucket, @Nonnull final String key){
    ResponseBytes<GetObjectResponse> objectBytes = getClientRequest(getObjectRequest(bucket, key));
    String lastModified = String.valueOf(objectBytes.response().lastModified());
    String fileName = getFileName(key);
    byte[] data = objectBytes.asByteArray();

    fileUtils.uploadByteFile(data, fileName);
    return new S3ResponseFileDto(fileName, lastModified, "S3에서 파일 다운로드 성공");
  }

  public String getUrl(Bucket bucket, String path){
    GetUrlRequest request = GetUrlRequest.builder().bucket(getBucketCode(bucket)).key(path).build();
    String result = null;
    try{
      result = s3Client.utilities().getUrl(request).toString();
    }catch (S3Exception e) {
      e.printStackTrace();
    }
    return result;
  }

  /**
   * 년/월/일 폴더명 반환
   */
  private String getFolderName() {
    return DefaultDateTimeConverter.convertDate(LocalDate.now());
  }

  private String getFileName(String key) {
    return key.substring(key.lastIndexOf(REGEX)+2);
  }

  private PutObjectRequest getPutObjectRequest(Bucket bucket, String key) {
    return PutObjectRequest.builder()
        .bucket(getBucketCode(bucket))
        .key(key)
        .build();
  }

  private GetObjectRequest getObjectRequest(Bucket bucket, String key) {
    return GetObjectRequest
            .builder()
            .bucket(getBucketCode(bucket))
            .key(key)
            .build();
  }

  private DeleteObjectRequest getDeleteObjectRequest(String bucket, String key)  {
    return DeleteObjectRequest
            .builder()
            .bucket(bucket)
            .key(key)
            .build();
  }

  private CopyObjectRequest getCopyObjectRequest(String fromBucket, String key, String toBucket, String toKey) {
    return CopyObjectRequest
            .builder()
            .sourceBucket(fromBucket)
            .sourceKey(key)
            .destinationBucket(toBucket)
            .destinationKey(toKey)
            .build();
  }

  private ResponseBytes<GetObjectResponse> getClientRequest(GetObjectRequest getObjectRequest) {
    ResponseBytes<GetObjectResponse> objectAsBytes = null;
    try {
      objectAsBytes = s3Client.getObjectAsBytes(getObjectRequest);
    }catch (Exception e) {
      e.printStackTrace();
    }
    return objectAsBytes;
  }

  public String copyObject(String key, String stogTpCd) {
    String toKey = key.replace("/temp", "");
    try {
      CopyObjectResponse response = s3Client.copyObject(
              getCopyObjectRequest(
                      getBucketName(stogTpCd),
                      key,
                      getBucketName(stogTpCd),
                      toKey
              )
      );
      log.info(response.copyObjectResult().toString());
    } catch (Exception e) {
      e.printStackTrace();
    }
    return toKey;
  }

  public boolean checkObject(TsyFl tsyFl) {
    boolean isValidObject = true;
    String key = tsyFl.getFlPath() + tsyFl.getFlNm() + "." + tsyFl.getFlExtn();
    try{
      s3Client.headObject(HeadObjectRequest.builder()
              .bucket(getBucketName(tsyFl.getStogTpCd()))
              .key(key)
              .build()
      );
    }catch (S3Exception e) {
      if (e.statusCode() == 404) {
        isValidObject = false;  // 404: NoSuchKey - The specified key does not exist
      }
      else {
        throw e;  // rethrow all S3 exceptions other than 404
      }
    }
    return isValidObject;
  }

  public void deletePrivateObject(@Nonnull final String key){
    try{
      s3Client.deleteObject(getDeleteObjectRequest(awsProperties.getPrvBucket(), key));
    }catch (S3Exception e) {
      e.printStackTrace();
    }
  }

  // stogTpCd 는 PUB(public) / PRV(private) 로 나뉨
  public void deleteObjectByTsyFl(TsyFl tsyFl){
    String key = tsyFl.getFlPath() + tsyFl.getFlNm() + "." + tsyFl.getFlExtn();
    try{
      s3Client.deleteObject(getDeleteObjectRequest(tsyFl.getStogTpCd(),key));
    }catch (S3Exception e) {
      e.printStackTrace();
    }
  }

  public void deleteObject(@Nonnull final String key, String stogTpCd){
    try{
      s3Client.deleteObject(getDeleteObjectRequest(getBucketName(stogTpCd), key));
    }catch (S3Exception e) {
      e.printStackTrace();
    }
  }

  public String getUuid() {
    return UUID.randomUUID().toString().replace("-","").toUpperCase();
  }

  private String getBucketName(String accessModifier) {
    return accessModifier.equals(StogTpCd.PUBLIC.getCode()) ? awsProperties.getPubBucket() : awsProperties.getPrvBucket();
  }

  public String getPreSignedUrl(String key, String expireTime) {
    String resultUrl = "";
    try {
      var getObjectRequest = GetObjectRequest
              .builder()
              .bucket(awsProperties.getPrvBucket())
              .key(key)
              .build();

      var getObjectPresignRequest = GetObjectPresignRequest.builder()
              .signatureDuration(Duration.ofSeconds(Long.parseLong(expireTime)))
              .getObjectRequest(getObjectRequest)
              .build();
      var presignedGetObjectRequest = s3Presigner.presignGetObject(getObjectPresignRequest);
      resultUrl = preSignedConverter(presignedGetObjectRequest.url().toString(), StogTpCd.PRIVATE.getCode());
    } catch (Exception e) {
      e.printStackTrace();
    }
    s3Presigner.close();
    return resultUrl;
  }

  public String putPreSignedUrl(String key, String stogTpCd, String expireTime) {
    String resultUrl = "";
    try {
      var putObjectRequest = PutObjectRequest.builder()
              .bucket(getBucketName(stogTpCd))
              .key(key)
              .build();

      var putObjectPresignRequest = PutObjectPresignRequest.builder()
              .putObjectRequest(putObjectRequest)
              .signatureDuration(Duration.ofSeconds(Long.parseLong(expireTime)))
              .build();
      var presignedPutObjectRequest = s3Presigner.presignPutObject(putObjectPresignRequest);
      resultUrl = preSignedConverter(presignedPutObjectRequest.url().toString(), stogTpCd);
    } catch (Exception e) {
      e.printStackTrace();
    }
    s3Presigner.close();
    return resultUrl;
  }

  private String preSignedConverter(String preSignedUrl, String stogTpCd) {
    int comIndex = preSignedUrl.indexOf(".com");
    if(stogTpCd.equals(StogTpCd.PUBLIC.getCode())){
      return awsProperties.getCfPubUrl() + preSignedUrl.substring(comIndex + 4);
    }else {
      return awsProperties.getCfPrvUrl() + preSignedUrl.substring(comIndex + 4);
    }
  }

  public String getS3Key(TsyFl tsyFl) {
    return tsyFl.getFlPath() + tsyFl.getFlNm() + "." + tsyFl.getFlExtn();
  }


  public InputStream downloadFiles(@Nonnull String stogTpCd, @Nonnull final String key) {
    return getClientRequest(
      GetObjectRequest
      .builder()
      .bucket(getBucketName(stogTpCd))
      .key(key)
      .build()
      ).asInputStream();
  }
}
