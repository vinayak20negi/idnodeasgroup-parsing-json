const path = require('path');
const fs = require("fs");
const inputFile = path.join(__dirname, './input-files/GetTariff_TB.json');

function run(){
  let output = {
    "bucket_code": " ",
    "code": " ",
    "required_tariff_codes": " ",
    "sales_period_start": " ",
    "allowed_sales_channel_codes": " ",
    "description": " ",
    "passenger_type_codes": " ",
    "product_code": " ",
    "journey_ods": " ",
    "max_group_size": " ",
    "booking_horizon_start": " ",
    "outbound_weekdays": " ",
    "travel_period_end": " ",
    "excluded_tariff_codes": " ",
    "inbound_weekdays": " ",
    "destination_bound": " ",
    "min_group_size": " ",
    "travel_period_start": " ",
    "external_references": " ",
    "service_bound": " ",
    "booking_horizon_start": " ",
    "inventory_class_code": " ",
    "disability_type_codes": " ",
    "origin_bound": " ",
    "validity_period": " ",
    "discount_cards": " ",
    "booking_horizon_end": " ",
    "validity_bidirectional": " ",
    "validity_usage_count": " ",
    "sales_period_end": " ",
    "type_of_sales": " ",
    "tariff_group": " ",
    "mandatory_return": ""
  }

  fs.readFile(inputFile, "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      const jsonParsedArray = JSON.parse(jsonString);

      // parse reading
      for (key in jsonParsedArray) {
        if (jsonParsedArray.hasOwnProperty(key)) {
          if(Object.getPrototypeOf( jsonParsedArray[key] ) === Object.prototype) {
            //console.log(`------------------${key} is object------------------`);
            output[`${key}`] = JSON.stringify(jsonParsedArray[key]);
          } else {
            output[`${key}`] = jsonParsedArray[key];
          }
        }
      }

      // create file from ouput result
      let fileOutput = "";
      for (key in output) {
        fileOutput = `${fileOutput}${output[key]}||`;
      }
      fileOutput = fileOutput.substring(0, fileOutput.length - 2);
      fileOutput = `${fileOutput}\n`;
      console.log("fileOutput ==>",fileOutput);
      fs.writeFile("ouput.txt", fileOutput, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The output saved in output.txt!");
      });
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
}

(async () => {
  await run();
})()
