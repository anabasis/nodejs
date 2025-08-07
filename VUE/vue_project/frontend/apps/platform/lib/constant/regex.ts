// 비밀번호 정규식
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@\#$%^&*_\-+\=\`|\\\(\)\{\}\[\]:;\'\"<>,.?\/]).{8,20}$/
// 이메일 정규식
export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
// 숫자 정규식
export const numberRegex = /[\d]/
// 공백 정규식
export const spaceRegex = /[\s]/
