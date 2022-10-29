export class Logger {
  static info(data: any) {
    console.log(`info : ${JSON.stringify(data)}`)
  }

  static warn(data: any) {
    console.log(`warn : ${JSON.stringify(data)}`)
  }

  static error(data: any) {
    console.log(`error : ${JSON.stringify(data)}`)
  }

  static debug(data: any) {
    console.log(`debug : ${JSON.stringify(data)}`)
  }
}
