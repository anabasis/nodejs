import { SHA256 } from 'crypto-js'

// return SHA256 encode
export const encodeSHA256 = (str: string): string => SHA256(str).toString()
