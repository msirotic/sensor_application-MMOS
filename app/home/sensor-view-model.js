import { Observable } from '@nativescript/core'
import { ad as contextApp} from "tns-core-modules/utils/utils";

export function SensorViewModel() {
    const viewModel = new Observable()


    var pocetna = 0;
    const context = contextApp.getApplicationContext();
    var manager = context.getSystemService(android.content.Context.SENSOR_SERVICE);
    var senzor = manager.getDefaultSensor(android.hardware.Sensor.TYPE_RELATIVE_HUMIDITY);
    var odgoda = android.hardware.SensorManager.SENSOR_DELAY_NORMAL;

    var sensorListener = new android.hardware.SensorEventListener({
        onAccuracyChanged: () => {},
        onSensorChanged: v => {
            promjenaVlaznosti(v.values[0])
            viewModel.set('q', 'Vlažnost = ' + v.values[0] + '%')
        }
    });

    const promjenaVlaznosti = vlaznost => { pocetna = vlaznost; }
    manager.registerListener( sensorListener, senzor, odgoda);

    
    viewModel.x = 10
    viewModel.y = 20
    viewModel.z = 30

    var accelerometer = require("nativescript-accelerometer")
    accelerometer.startAccelerometerUpdates(function(data) {
        viewModel.set('x', 'X = ' + data.x)
        viewModel.set('y', 'Y = ' + data.y)
        viewModel.set('z', 'Z = ' + data.z)
    }, 
    { sensorDelay: "ui" })
  
  return viewModel
}


