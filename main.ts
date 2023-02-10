let lux = 0
const TSL2561_I2C_ADRESS = 0x39
const GAIN_ACCES = 0x80
const INTEGRATION_TIME = 0x02
const CH0_ACCES_LOW = 0x0C
const CH0_ACCES_UP = 0x0D
const CH1_ACCES_LOW = 0x0E
const CH1_ACCES_UP = 0x0F
const INTERRUP_REG = 0x86
const ENABLE = 0X03
let ch0= 0;
let ch1 = 0;

function set_Reg(command: number) {
    let buf = pins.createBuffer(2);
    // basic.pause(10)
    // basic.pause(10)
    buf[0] = command >> 8
    buf[1] = command
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
    let t = getReg(GAIN_ACCES)
    t &= 0x11
    set_Reg_num(GAIN_ACCES, t);
    basic.showNumber(t)
    }

    /**
                * Returns a number describing the LUX intensity
            */
    //% blockId="CIPLUXint"
    //% block="interrup"
export function interrup() {
    let t = getReg(INTERRUP_REG)
    t &= 0x06
    set_Reg_num(INTERRUP_REG, t);
    basic.showNumber(t)
}

    /**
            * Returns a number describing the LUX intensity
        */
    //% blockId="CIPLUX"
    //% block="Leer LUX"
export function LUX(): number {
    pins.i2cWriteNumber(TSL2561_I2C_ADRESS, CH0_ACCES_LOW | CH0_ACCES_UP, NumberFormat.UInt16LE)
    basic.pause(100);
    let buff = pins.i2cReadBuffer(TSL2561_I2C_ADRESS, 2);
    let result = buff[0] << 8;
    result |= buff[1];

    pins.i2cWriteNumber(TSL2561_I2C_ADRESS, CH1_ACCES_LOW | CH1_ACCES_UP, NumberFormat.UInt16LE)
    basic.pause(100);
    let buf = pins.i2cReadBuffer(TSL2561_I2C_ADRESS, 2);
    let result_1 = buf[0] << 8;
    result_1 |= buf[1];
    return result + result_1
    //set_Reg_num(INTERRUP_REG, 0x10);
    //basic.pause(10);
    //set_Reg(CH0_ACCES_UP);
    //let ch00 = pins.i2cReadBuffer(TSL2561_I2C_ADRESS, NumberFormat.UInt16LE)
    //let result = ch00[0] << 8;
    //result |= ch00[1];
    //ch00 = ch00*(1 << 8)
    //basic.pause(50)
    //set_Reg_num(INTERRUP_REG, 0x10);
    //basic.pause(1000);
    //set_Reg(0x83);
    //let ch01 = pins.i2cReadBuffer(TSL2561_I2C_ADRESS, NumberFormat.UInt16LE)
    //let result_1 = ch01[0] << 8;
    //result_1 |= ch01[1];
    //let data = pins.i2cReadNumber(TSL2561_I2C_ADRESS, NumberFormat.UInt16BE, false)
    //lux = 256*(ch0+ ch1)
   //return result
}
    /**
            * Returns a number describing the LUX intensity
        
    //% blockId="CIPLUX"
    //% block="Revision CH0"
    export function measure(): number {
        set_Reg_num(GAIN_ACCES, INTEGRATION_TIME )
        basic.pause(6)
        let DW = get2Reg(CH0_ACCES_LOW)
        let UP = get2Reg(CH0_ACCES_UP)
        let DW1 = get2Reg(CH1_ACCES_LOW)
        let UP1 = get2Reg(CH1_ACCES_UP)
        let result0 = 256 * UP + DW
        let result1 = 256 * UP1 + DW1

        return result1 - result0
        
    }
    */
}