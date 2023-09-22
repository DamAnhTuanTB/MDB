import MobileDetect from 'mobile-detect'

enum OS {
  ANDROID = 'AndroidOS',
  IOS = 'iOS'
}

class PlatformDetector {
  public md: MobileDetect

  constructor() {
    this.md = new MobileDetect(window.navigator.userAgent)
  }

  get isMobile() {
    return !!this.md.mobile()
  }

  get isTablet() {
    return !!this.md.tablet()
  }

  get isIos() {
    return this.md.os() === OS.IOS
  }

  get isAndroid() {
    return this.md.os() === OS.ANDROID
  }
}

export default PlatformDetector
