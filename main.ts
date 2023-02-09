let lux = 0
const TSL2561_I2C_ADRESS = 0x39
const GAIN_ACCES = 0x81
const INTEGRATION_TIME = 0x11
const CH0_ACCES_LOW = 0x8C
const CH0_ACCES_UP = 0x8D
const INTERRUP_REG = 0x86
let ch0= 0;
let ch1 = 0;

function set_Reg(command: number) {
    let buf = pins.createBuffer(2);
    // basic.pause(10)
    // basic.pause(10)
    buf[0] = command >> 16
    buf[1] = command & 0xFF
    return pins.i2cWriteBuffer(SHT31_DEFAULT_ADDR, buf)
}

function set_Reg_num(reg: number, dat: number): void {
    let _wbuf = pins.createBuffer(2);
    _wbuf[0] = reg;
    _wbuf[1] = dat;
    pins.i2cWriteBuffer(TSL2561_I2C_ADRESS, _wbuf);
}
function getReg(reg: number): number {
    pins.i2cWriteNumber(TSL2561_I2C_ADRESS, reg, NumberFormat.UInt8BE);
    return pins.i2cReadNumber(TSL2561_I2C_ADRESS, NumberFormat.UInt8BE);
}

function get2Reg(reg: number): number {
    pins.i2cWriteNumber(TSL2561_I2C_ADRESS, reg, NumberFormat.UInt8BE);
    return pins.i2cReadNumber(TSL2561_I2C_ADRESS, NumberFormat.Int16BE);
}


//% color=#9C36B5 weight=25 icon="\uf005" block="CIPLUX2560"
namespace CIPLUX {
    /**
            * Returns a number describing the LUX intensity
        */
    //% blockId="CIPLUXINIT"
    //% block="init"
export function init() {
        set_Reg_num(GAIN_ACCES, INTEGRATION_TIME);
        set_Reg_num(INTERRUP_REG, 0x10);
    }

    /**
            * Returns a number describing the LUX intensity
        */
    //% blockId="CIPLUX"
    //% block="Leer LUX"
export function LUX(): number {
    basic.pause(10);
    set_Reg(CH0_ACCES_LOW);
    let ch00 = pins.i2cReadBuffer(TSL2561_I2C_ADRESS, NumberFormat.UInt16BE)
    let result = ch00[0] << 16;
    result |= ch00[1];
    //ch00 = ch00*(1 << 8)

    
    basic.pause(1000);
    set_Reg(CH0_ACCES_UP);
    let ch01 = pins.i2cReadBuffer(TSL2561_I2C_ADRESS, NumberFormat.UInt16BE)
    //ch01 = 1 << 8
    //let data = pins.i2cReadNumber(TSL2561_I2C_ADRESS, NumberFormat.UInt16BE, false)
    //lux = 256*(ch0+ ch1)
    return result
}

}