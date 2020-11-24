export const DeviceController_GetDevices = `/api/device/devices`;
export const DeviceController_GetDevice = (id) => `/api/device/devices/${id}`;
export const DeviceController_CreateDevice = `/api/device/create`;
export const DeviceController_EditDevice = (id) => `/api/device/edit/${id}`;
export const DeviceController_DeleteDevice = (id) => `/api/device/delete/${id}`;
export const SensorController_GetSensors = `/api/sensor/sensors`;
export const SensorController_GetDeviceSensors = (id) => `/api/sensor/deviceSensors/${id}`;
export const AccountController_ChangePassword = `/api/security/changePassword`;