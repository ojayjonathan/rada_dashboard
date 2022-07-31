import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "../../toast";
import { Campus, ContactInfo } from "../../types/types";
import client from "../client";
import API_ENDPOINTS from "../client/api-endpoints";

export const useCampuses = () => {
  return useQuery<{ campuses: Campus[] }, Error>(
    [API_ENDPOINTS.CAMPUSES],
    client.admin.campuses
  );
};

export const useContacts = () => {
  return useQuery<{ contacts: ContactInfo[] }, Error>(
    [API_ENDPOINTS.CONTACT],
    client.admin.contacts
  );
};

export const useDeleteContact = () => {
  const query = useQueryClient();
  return useMutation<{ contacts: ContactInfo }, Error, string>(
    client.admin.deleteContact,
    {
      onSuccess: (data, _variable, _context) => {
        query.setQueriesData([API_ENDPOINTS.CONTACT], (old: any) => {
          if (old) {
            return {
              contacts: old.contacts.filter(
                (contact: ContactInfo) => contact._id !== data.contacts._id
              ),
            };
          }
        });
        toast.success({
          message: "Contact deleted successfuly!",
          options: { duration: 10000 },
        });
      },
      onSettled: () => {
        query.invalidateQueries([API_ENDPOINTS.CONTACT]);
      },
      onError: (error, _, _previousData) => {
        toast.error({ message: error.message, options: { duration: 10000 } });
      },
    }
  );
};
export const useCreateContact = () => {
  const query = useQueryClient();
  return useMutation<{ contacts: ContactInfo }, Error, ContactInfo>(
    client.admin.createContact,
    {
      onMutate: () => {
        toast.success({ message: "Creating contact, please wait..." });
      },
      onSuccess: (data, _variable, _context) => {
        query.setQueriesData([API_ENDPOINTS.CONTACT], (old: any) => {
          if (old) {
            return {
              contacts: [...old.contacts, data.contacts],
            };
          }
        });
        toast.success({
          message: "Contact Created successfuly!",
          options: { duration: 10000 },
        });
      },
      onSettled: () => {
        query.invalidateQueries([API_ENDPOINTS.CONTACT]);
      },
      onError: (error, _, _previousData) => {
        toast.error({ message: error.message, options: { duration: 10000 } });
      },
    }
  );
};
