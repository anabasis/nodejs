import React, { ChangeEvent, useState } from 'react'

export default {
  title: 'Guide/MailForm',
  tags: ['autodocs'],
}

export const Template = () => {
  return (
    <>
      <p className="title1">원본파일 경로 :: /apps/storybook/stories/dummy/MailTemp.html</p>
      <p className="body2">• 해당 파일은 react 형식으로 컴파일 했기 때문에 그대로 사용 불가입니다.</p>
      <p className="body2 mb_20">• html 원본 파일로 개발소스에 적용되어야합니다.</p>
      <table
        border={0}
        cellSpacing="0"
        cellPadding="0"
        style={{
          width: '100%',
          backgroundColor: '#ffffff',
          borderCollapse: 'separate',
          borderStyle: 'hidden',
        }}
      >
        <tbody>
          <tr>
            <td valign="top" style={{ padding: '0 0 0' }}>
              <div>
                {/* Outer Area (Background) */}
                <table
                  cellPadding="0"
                  cellSpacing="0"
                  width="600"
                  style={{
                    margin: '10px auto',
                    padding: '0',
                    borderSpacing: '0',
                    backgroundColor: '#f4f8fc',
                  }}
                >
                  <tr>
                    <td width="490" height="80" style={{ fontSize: 0, lineHeight: 0, padding: '0 35px' }}>
                      <img src="//www.stg.sg-drdp.com/images/mail/seegeneLogo.jpg" alt="Seegene" />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0 35px 35px' }}>
                      <table
                        cellPadding="0"
                        cellSpacing="0"
                        width="530"
                        style={{
                          margin: '0 auto',
                          padding: '0',
                          borderSpacing: '0',
                          backgroundColor: '#ffffff',
                        }}
                      >
                        <tr>
                          <td width="410" height="auto" style={{ fontSize: 0, padding: '40px 37px 0' }}>
                            <h5
                              style={{
                                color: '#1a1f23',
                                fontSize: '22px',
                                lineHeight: '28px',
                                textAlign: 'left',
                                fontWeight: 600,
                                margin: '0',
                              }}
                            >
                              메일폼 제목영역
                            </h5>
                          </td>
                        </tr>
                        <tr>
                          <td width="410" height="auto" style={{ fontSize: 0, padding: '13px 37px 40px' }}>
                            <p
                              style={{
                                display: 'block',
                                color: '#959ba0',
                                fontSize: '15px',
                                lineHeight: '20px',
                                textAlign: 'left',
                                fontWeight: 500,
                                margin: '0',
                              }}
                            >
                              메세지 내용입니다
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td width="450" style={{ padding: '0 37px' }}>
                            <div
                              style={{
                                width: '400px',
                                backgroundColor: '#f4f8fc',
                                padding: '30px',
                                borderRadius: '8px',
                              }}
                            >
                              <table>
                                <tbody>
                                  {/* Contents should be structured using tables */}
                                  <tr>
                                    <th
                                      style={{
                                        color: '#808da8',
                                        paddingRight: '30px',
                                        fontSize: '14px',
                                        fontWeight: 400,
                                        textAlign: 'left',
                                        lineHeight: '1.3',
                                        letterSpacing: '-0.1px',
                                        paddingBottom: '20px',
                                      }}
                                    >
                                      Label
                                    </th>
                                    <td
                                      style={{
                                        color: '#44547e',
                                        fontSize: '15px',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        lineHeight: '1.333',
                                        paddingBottom: '20px',
                                        letterSpacing: '-0.4px',
                                      }}
                                    >
                                      Contents
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="410" height="auto" style={{ fontSize: 0, padding: '30px 37px 40px' }}>
                            <div
                              style={{
                                display: 'block',
                                padding: '5px 0 0',
                                color: '#959ba0',
                                fontSize: '14px',
                                lineHeight: '18px',
                                textAlign: 'left',
                                fontWeight: 400,
                                margin: '0',
                              }}
                            >
                              <p>• 하단 메세지 내용영역입니다.</p>
                              <p>• 하단 메세지 내용영역입니다.</p>
                              <p>
                                3줄 처리방법. 하단 메세지 내용영역입니다.
                                <br />
                                하단 메세지 내용영역입니다.
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td
                            width="550"
                            style={{
                              fontSize: 0,
                              padding: '35px 37px',
                              textAlign: 'center',
                            }}
                          >
                            <a
                              href="#"
                              style={{
                                display: 'inline-block',
                                minWidth: '166px',
                                backgroundColor: '#3357ff',
                                margin: '0 auto',
                                fontSize: '18px',
                                lineHeight: '24px',
                                textDecoration: 'none',
                                color: '#ffffff',
                                textAlign: 'center',
                                padding: '13px 20px',
                                borderRadius: '8px',
                                boxSizing: 'border-box',
                              }}
                            >
                              Move to OneSystem
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
