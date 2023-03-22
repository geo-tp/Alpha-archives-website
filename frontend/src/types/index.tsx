export type CardLinkType = {
  title: string;
  img: string;
  alt: string;
  link: string;
};

export type AppliedTagType = {
  id: number;
  tag: string;
  file_hash: string;
};

export type TagType = {
  name: string;
  user: number;
};

export type RandomScreenshotType = {
  id: number;
  random_number: number;
  total_number: number;
  parent: string;
  filename: string;
  is_folder: boolean;
  image_raw: string;
  image_thumbnaill: string;
  image_hash: string;
  tags: AppliedTagType[];
};

export type UserType = {
  id: number | null;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  birthdate: number | null;
  street_number: string;
  street_type: string;
  street_name: string;
  city_zipcode: string;
  city: string;
  address_complement: string;
  country: string;
  phone_number: string;
};

export type AuthType = {
  token: string;
  isAdmin: boolean;
  isStaff: boolean;
  expired: boolean;
};

export type MediaType = {
  id: number;
  parent: string;
  filename: string;
  is_folder: boolean;
  image_raw: string | null;
  image_thumbnail: string | null;
  image_hash: string | null;
  tags: AppliedTagType[];
};
