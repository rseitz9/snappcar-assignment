class logger {
  static info(msg: string) {
    console.log(msg);
  }

  static error(msg: string) {
    console.error(msg);
  }
}
export default logger;