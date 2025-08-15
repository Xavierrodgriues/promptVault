export interface Prompt {
  _id: string;
  ownerId: {
    _id?: string;
    username?: string;
    email?: string;
  };
  title: string;
  promptText: string;
  tags: string[];
  category:
    | "Marketing"
    | "Social Media"
    | "Coding"
    | "Email"
    | "Education"
    | "Design"
    | "Personal"
    | "Business"
    | "Medical"
    | "Other"; // ✅ now a single string, not an array
  type: "personal" | "community";
  createdAt: string;
  updatedAt?: string; // ✅ optional because sometimes it's not in API
}
