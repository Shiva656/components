/**
 * @mixin
 */
export const GlobalFunc = {
    methods: {
        get_sentence_case: function (type, str) {
            if ((str === null) || (str === '')) {
                return false
            } else {
                switch (type) {
                    case "upper":
                        return_data = str.toUpperCase();
                        break;
                    case "lower":
                        return_data = str.toLowerCase();
                        break;
                    default:
                        return_data = "Please check type";
                }
                return return_data;
            }
        },
        get_title_case: function (str) {
            if ((str === null) || (str === ''))
                return false;
            else
                str = str.toString();

            return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        },
        convert_date: function (data, format) {
            if ((data === null) || (data === '')) {
                return false
            } else {
                switch (format) {
                    case "local":
                        return_data = new Date(data);
                        break;
                    case "epoch":
                        return_data = new Date(data).getTime()/1000;
                        break;
                    default:
                        return_data = "Please check format";
                }
                return return_data;
            }
        }
    }
}