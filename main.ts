let lux = 0
const TSL2561_I2C_ADRESS = 0x39
const GAIN_ACCES = 0x81
const INTEGRATION_TIME = 0X11
const CH0_ACCES_LOW = 0X8C
const CH0_ACCES_UP = 0X8D
let ch0= 0;
let ch1 = 0;

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
    //% blockId="CIPLUX"
    //% block="Leer LUX"
export function LUX(): number {
    set_Reg_num(GAIN_ACCES, INTEGRATION_TIME);
    basic.pause(10);
    let ch00 = get2Reg(CH0_ACCES_LOW);
    basic.pause(1000);
    let ch01 = get2Reg(CH0_ACCES_UP);
    //let data = pins.i2cReadNumber(TSL2561_I2C_ADRESS, NumberFormat.UInt16BE, false)
    //lux = 256*(ch0+ ch1)
    return ch00
}

}