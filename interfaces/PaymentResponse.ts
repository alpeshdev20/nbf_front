export interface Root {
    success: boolean
    response: Response
    orderId: number
    amount: number
  }
  
  export interface Response {
    head: Head
    body: Body
  }
  
  export interface Head {
    responseTimestamp: string
    version: string
    signature: string
  }
  
  export interface Body {
    resultInfo: ResultInfo
    txnToken: string
    isPromoCodeValid: boolean
    authenticated: boolean
  }
  
  export interface ResultInfo {
    resultStatus: string
    resultCode: string
    resultMsg: string
  }
  