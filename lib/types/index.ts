export type IPermission = {
  id: string;
  role: "admin" | "manager" | "verified_user" | "new_user";
  status: "active" | "resigned";
  member_id: string;
  member: {
    id: string;
    created_at: string;
    name: string;
    email: string;
  };
};

export type ITask = {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
  created_by: string;
  assigned_to: string;
};
