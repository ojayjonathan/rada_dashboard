import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "../../toast";
import { Counsellor, PeerCounsellor, User } from "../../types/types";
import client from "../client";
import API_ENDPOINTS from "../client/api-endpoints";
import { CED, CounsellorAdd } from "../client/types";

export const useCounselors = () => {
  return useQuery<CED<Counsellor[]>, Error>(
    [API_ENDPOINTS.COUNSELLORS],
    client.counselling.cousellors
  );
};

export const usePeerCounselors = () => {
  return useQuery<CED<PeerCounsellor[]>, Error>(
    [API_ENDPOINTS.PEER_COUNSELLORS],
    client.counselling.peerCousellors
  );
};

export const useAddCounsellor = () => {
  const query = useQueryClient();
  return useMutation<CED<Counsellor>, Error, CounsellorAdd>(
    client.counselling.addCousellor,
    {
      onMutate: () => {
        toast.success({
          message: "Adding counsellor, please wait...",
        });
      },
      onSuccess: (data, _variable, _context) => {
        toast.success({
          message: "Counsellor added successfuly!",
        });
        query.invalidateQueries([API_ENDPOINTS.PEER_COUNSELLORS]);
      },

      onError: (error) => {
        toast.error({ message: error.message });
      },
    }
  );
};

export const useAddPeerCounselor = () => {
  const query = useQueryClient();
  return useMutation<CED<PeerCounsellor>, Error, CounsellorAdd>(
    client.counselling.addPeerCousellor,
    {
      onMutate: () => {
        toast.success({
          message: "Adding peer counsellor, please wait...",
        });
      },
      onSuccess: (data, _variable, _context) => {
        toast.success({
          message: "Peer Counsellor added successfuly!",
        });
        query.invalidateQueries([API_ENDPOINTS.PEER_COUNSELLOR]);
      },

      onError: (error) => {
        toast.error({ message: error.message });
      },
    }
  );
};
