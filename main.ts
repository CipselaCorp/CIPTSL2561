let lux = 0
let TSL2561_I2C_ADRESS = 0x39
let GAIN_ACCES = 0x81
let INTEGRATION_TIME = 0X11
let CH0_ACCES_LOW = 0X8C
let CH0_ACCES_UP = 0X8D

function set_Reg_num(reg: number, dat: number): void {
    let _wbuf = pins.createBuffer(2);
    _wbuf[0] = reg | 0xff;
    _wbuf[1] = dat;
    pins.i2cWriteBuffer(TSL2561_I2C_ADRESS, _wbuf);
}

function set_Reg(command: number): number {
    let buf = pins.createBuffer(2);
    // basic.pause(10)
    // basic.pause(10)
    buf[0] = command >> 16
    buf[1] = command & 0xff
    return pins.i2cWriteBuffer(TSL2561_I2C_ADRESS, buf)
}

//% color=#9C36B5 weight=25 icon="\uf005" block="CIPLUX2560"
namespace CIPLUX {
    /**
            * Returns a number describing the LUX intensity
        */
    //% blockId="CIPLUX"
    //% block="Leer LUX"
export function LUX(): number {
    //set_Reg_num(GAIN_ACCES, 0x11);
    basic.pause(10)
    setReg(CH0_ACCES_LOW);
    basic.pause(10)
    let ch0 = pins.i2cReadBuffer(TSL2561_I2C_ADRESS, pins.sizeOf(NumberFormat.UInt16LE) * 7)
    let result_1 = ch0[0] << 8;
    result_1 |= ch0[1];
    basic.pause(1000)
    set_Reg(CH0_ACCES_UP)
    basic.pause(10)
    let ch1 = pins.i2cReadBuffer(TSL2561_I2C_ADRESS, pins.sizeOf(NumberFormat.UInt16LE) * 7)
    let result_2 = ch1[0] << 8;
    result_2 |= ch1[1];
    basic.pause(100)
    //let data = pins.i2cReadNumber(TSL2561_I2C_ADRESS, NumberFormat.UInt16BE, false)
    lux = 256*(result_1 + result_2)
    return lux
}

}