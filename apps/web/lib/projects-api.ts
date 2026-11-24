
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type ProjectApi = {
  id: number;
  name: string;
  description: string | null;
  category: string;
  start_date: string;
  due_date: string;
  priority: "Low" | "Medium" | "High";
  progress: number;
  status: "In Progress" | "Completed";
  created_at: string;
};

type ProjectPayload = {
  name: string;
  description: string;
  category: string;
  startDate: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  projects?: T[];
  project?: T;
};

const headers = {
  "Content-Type": "application/json",
  "x-user-role": "PROJECT_MANAGER",
  "x-organization-id": "org-001",
  "x-user-id": "user-001",
};

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data as T;
}

export async function fetchProjects(): Promise<ProjectApi[]> {
  const response = await fetch(`${API_URL}/api/projects`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const data = await handleResponse<ApiResponse<ProjectApi>>(response);

  return data.projects ?? [];
}

export async function createProject(
  payload: ProjectPayload
): Promise<ProjectApi> {
  const response = await fetch(`${API_URL}/api/projects`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  const data = await handleResponse<ApiResponse<ProjectApi>>(response);

  if (!data.project) {
    throw new Error("Project was not returned by the server.");
  }

  return data.project;
}
