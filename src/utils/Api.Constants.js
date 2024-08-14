// Local Connection Base Url
const BASE_URL = "http://localhost:8080";

// Authenticate URL
export const AUTHENTICATE = `${BASE_URL}/authenticate`;

//  GET User Details
export const GET_USER_DETAILS = (userName) =>
  `${BASE_URL}/api/user/${userName}`;

//  GET All Projects
export const GET_ALL_PROJECTS = (userId) =>
  `${BASE_URL}/api/projects/user/${userId}`;

//  GET All Tasks
export const GET_ALL_TASKS = (projectId) =>
  `${BASE_URL}/api/tasks/project/${projectId}`;

// Create a Project
export const CREATE_PROJECT = `${BASE_URL}/api/project/create`;

// Create a Task
export const CREATE_TASK = `${BASE_URL}/api/task/create`;

// Update a Task
//export const UPDATE_TASK = `${BASE_URL}/api/task/update/${taskId}`;
