import { DeltaOperation } from "quill";

export type SideBarItem = {
  title: string;
  to: string;
  icon: string;
};

export type User = {
  _id: string;
  name: string;
  profilePic: string;
  email: string;
  gender?: string;
  phone: string;
  dob?: string;
};
export type Counsellor = User & {
  rating?: number;
  isOnline: boolean;
  expertise: string;
  counsellorId: number;
  schedule: Schedule[];
};

export type PeerCounsellor = User & {
  regNo: string;
  studentId?: number;
  peerCounsellorId: string;
  expertise?: string;
};

export type Schedule = {
  day: string;
  active: {
    from: string;
    to: string;
  };
};

export const enum UserRoles {
  Admin = "ADMIN",
  Counsellor = "COUNSELLOR",
  Unkwon = "UNKOWN",
}

export type Role = {
  name: UserRoles;
  _id: string | number;
};
export const enum ContentType {
  List = "0",
  Img = "1",
  Text = "3",
  Title = "3",
}

export type Group = {
  id?: number;
  title: string;
  image?: string;
  description?: string;
};
export type ContactInfo = {
  _id?: number;
  name: string;
  email: string;
  phone: string;
  campus_id: string;
};

export type Content = DeltaOperation[];
export type QuillDeltaOperation = DeltaOperation;

export type ContentCategory = {
  name: string;
  _id: string;
};
export type ContentMetadata = {
  title: string;
  category: string;
  thumbnail: any;
};

export type InformationContent = {
  metadata: ContentMetadata;
  content: DeltaOperation[];
  _id?: string | number;
};
export type Campus = {
  name: string;
  _id?: string | number;
};
export type News = {
  content: string;
  image: string;
  _id?: string;
  title: string;
};

export type ChartData = {
  labels: string[];
  datasets: [
    {
      backgroundColor: string | string[];
      borderColor?: string;
      data: number[] | string[];
      fill: boolean;
    }
  ];
};

export type LoginData = {
  password: string;
  email: string;
};

export type Error = {
  message: string;
  data?: any;
  status: number;
};
