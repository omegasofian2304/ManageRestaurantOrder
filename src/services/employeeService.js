import{createEmployeeRepository} from "../repositories/employeeRepository.js";

export const createEmployeeService = async (data) => {
    return createEmployeeRepository(data);
}