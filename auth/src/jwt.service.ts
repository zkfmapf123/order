import { failed, passed } from '../../core/src/Try'
import jwt from 'jsonwebtoken'

interface JwtPayloadParams {
  id: number
  name: string
  jwtSecret: string
}

interface JwtVerifyParams {
  token: string
  jwtSecret: string
}

/**
 * @desc
 * AccessToken Expired 6 hours
 * RefreshToken Expired 15 day
 */
class JwtManager {
  private HOUR = 60
  private ACCESS_TOKEN_EXPIRED = this.HOUR * 6
  private REFRESH_TOKEN_EXPIRED = this.HOUR * 24 * 15

  getAccessToken({ id, name, jwtSecret }: JwtPayloadParams, expiresIn = this.ACCESS_TOKEN_EXPIRED) {
    return jwt.sign(
      {
        id,
        name,
      },
      jwtSecret,
      {
        issuer: 'leedonggyu',
        expiresIn,
      }
    )
  }

  getRefreshToken({ id, name, jwtSecret }: JwtPayloadParams, expiresIn = this.REFRESH_TOKEN_EXPIRED) {
    return jwt.sign(
      {
        id,
        name,
      },
      jwtSecret,
      {
        issuer: 'leedonggyu',
        expiresIn,
      }
    )
  }

  decode({ token, jwtSecret }: JwtVerifyParams) {
    try {
      return passed(jwt.verify(token, jwtSecret))
    } catch (e) {
      return failed(e)
    }
  }
}

export const jwtManager = new JwtManager()
