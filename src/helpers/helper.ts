const filters = {
    moneyFormat: function (value: number) {
        let format = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',

            // These options are needed to round to whole numbers if that's what you want.
            minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            maximumFractionDigits: 2 // (causes 2500.99 to be printed as $2,501)
        })
        return format.format(value)
    },
    percentFormat: function (value: number) {
        let format = new Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
        return format.format(value / 100)
    },
    parseInt: (num: string | number, radix: number = 10): number => {
        let output = 0
        if (typeof num === 'number') output = Math.trunc(num)
        else output = parseInt(num.trim(), radix)

        if (isNaN(output)) {
            output = 0
        }
        return output
    },
    parseFloat: (num: string | number): number => {
        let output = 0
        if (typeof num === 'number') output = num
        else output = parseFloat(num.trim())

        if (isNaN(output)) {
            output = 0
        }
        return output
    }
}

export default filters