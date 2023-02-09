let lux = 0
let TSL2561_I2C_ADRESS = 0x39
let GAIN_ACCES = 0x80
let GAIN = 0x10
let INTEGRATION_TIME = 0X01

//% color=#9C36B5 weight=25 icon="\uf005" block="CIPLUX2560"
namespace CIPLUX {
    /**
            * Returns a number describing the LUX intensity
        */
    //% blockId="CIPLUX"
    //% block="Leer LUX"
export function LUX(): number {
    pins.i2cWriteNumber(TSL2561_I2C_ADRESS, GAIN_ACCES | GAIN | INTEGRATION_TIME, NumberFormat.UInt8BE)
    basic.pause(100)
    let data = pins.i2cReadNumber(TSL2561_I2C_ADRESS, NumberFormat.UInt16BE, false)
    lux = (data - 250) / 0.72
    return lux
}

}