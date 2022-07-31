import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "../../toast";
import { ContentCategory, InformationContent, News } from "../../types/types";
import client from "../client";
import API_ENDPOINTS from "../client/api-endpoints";
import { ItemUpdate, NewsData } from "../client/types";

export const useNews = () => {
  return useQuery<NewsData<News[]>, Error>(
    [API_ENDPOINTS.NEWS],
    client.content.news
  );
};

export const useCreateNews = () => {
  const query = useQueryClient();
  return useMutation<NewsData<News>, Error, FormData>(
    client.content.createNews,
    {
      onMutate: (_) => {
        toast.success({ message: "Creating new, please wait..." });
      },
      onSuccess: (data) => {
        query.setQueriesData([API_ENDPOINTS.NEWS], (old: any) => ({
          data: {
            payload: [...old.data.payload, data],
          },
        }));
        toast.success({
          message: "News created successfuly!",
          options: { duration: 5000 },
        });
      },
      onSettled: () => {
        query.invalidateQueries([API_ENDPOINTS.NEWS]);
      },
      onError: (error, _) => {
        toast.error({ message: error.message, options: { duration: 10000 } });
      },
    }
  );
};

export const useDeleteNews = () => {
  const query = useQueryClient();
  return useMutation<NewsData<News>, Error, string>(client.content.deleteNews, {
    onSuccess: (data, _variable, _context) => {
      query.setQueriesData(
        [API_ENDPOINTS.NEWS],
        (old: NewsData<News> | any) => {
          if (old) {
            return {
              data: {
                payload: old.news.filter(
                  (news: News) => news._id !== data.news._id
                ),
              },
            };
          }
        }
      );
      toast.success({
        message: "News deleted successfuly!",
        options: { duration: 2000 },
      });
    },
    onSettled: () => {
      query.invalidateQueries([API_ENDPOINTS.NEWS]);
    },
    onError: (error, _, _previousData) => {
      toast.error({ message: error.message, options: { duration: 10000 } });
    },
  });
};

export const useContentCategory = () => {
  return useQuery<{ contentCategories: ContentCategory[] }, Error>(
    [API_ENDPOINTS.CONTENT_CATEGORY],
    client.content.categories
  );
};

export const useCreateContentCategory = () => {
  const query = useQueryClient();
  return useMutation<{ contentCategory: ContentCategory }, Error, string>(
    client.content.createCategory,
    {
      onMutate: (_) => {
        toast.success({ message: "Creating content category, please wait..." });
      },
      onSuccess: (data) => {
        query.setQueriesData([API_ENDPOINTS.CONTENT_CATEGORY], (old: any) => ({
          contentCategories: [
            ...(old.contentCategories ?? []),
            data.contentCategory,
          ],
        }));
        query.invalidateQueries([API_ENDPOINTS.CONTENT_CATEGORY]);
        toast.success({
          message: "Content category created successfuly!",
          options: { duration: 2000 },
        });
      },
      onError: (error, _) => {
        toast.error({ message: error.message, options: { duration: 10000 } });
      },
    }
  );
};
export const useContent = () => {
  return useQuery<{ content: InformationContent[] }, Error>(
    [API_ENDPOINTS.CONTENT],
    client.content.all
  );
};

export const useCreateContent = () => {
  const query = useQueryClient();
  return useMutation<{ content: InformationContent }, Error, FormData>(
    client.content.create,
    {
      onMutate: (_) => {
        toast.success({ message: "Creating content, please wait..." });
      },
      onSuccess: (data) => {
        query.setQueriesData([API_ENDPOINTS.CONTENT], (old: any) => ({
          content: [...(old.content ?? []), data.content],
        }));
        query.invalidateQueries([API_ENDPOINTS.CONTENT]);
        toast.success({
          message: "Content created successfuly!",
        });
      },
      onError: (error, _) => {
        toast.error({ message: error.message });
      },
    }
  );
};

export const useUpdateContent = () => {
  const query = useQueryClient();
  return useMutation<
    { content: InformationContent },
    Error,
    ItemUpdate<FormData>
  >(client.content.update, {
    onMutate: (_) => {
      toast.success({ message: "Updating content, please wait..." });
    },
    onSuccess: (data) => {
      query.setQueriesData([API_ENDPOINTS.CONTENT], (old: any) => ({
        content: old.content.map((content: InformationContent) => {
          if (content._id === data.content._id) {
            return data.content;
          }
          return content;
        }),
      }));
      query.invalidateQueries([API_ENDPOINTS.CONTENT]);
      toast.success({
        message: "Content Updated successfuly!",
      });
    },
    onError: (error, _) => {
      toast.error({ message: error.message });
    },
  });
};
export const useDeleteContent = () => {
  const query = useQueryClient();
  return useMutation<{ content: InformationContent }, Error, string | number>(
    client.content.delete,
    {
      onMutate: (_) => {
        toast.success({ message: "Deleting content, please wait..." });
      },
      onSuccess: (data) => {
        query.setQueriesData([API_ENDPOINTS.CONTENT], (old: any) => ({
          content: old.content.filter(
            (content: InformationContent) => content._id !== data.content._id
          ),
        }));
        query.invalidateQueries([API_ENDPOINTS.CONTENT]);
        toast.success({
          message: "Content Deleted successfuly!",
        });
      },
      onError: (error, _) => {
        toast.error({ message: error.message });
      },
    }
  );
};
