import { useState, useEffect, useRef, useCallback } from "react";
import { Photo } from "../interfaces/GalleryTypes";
import { Pagination } from "../interfaces/DataTypes";

export function useInfiniteScroll(
  fetchData: (per_page: number, order_by: string) => Promise<any>,
  per_page: number,
  order_by: string,
  initialData = [],
  initialPagination = null
) {
  const [items, setItems] = useState<Photo[]>(initialData);
  const [pagination, setPagination] = useState<Pagination | null>(
    initialPagination
  );

  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(per_page);
  const [photoOrder, setPhotoOrder] = useState(order_by);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  console.log(page);
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    const fetchMoreData = async () => {
      setIsLoading(true);
      setTimeout(async () => {
        const res = await fetchData(page, photoOrder);
        setIsLoading(false);
        setItems((prevItems) => {
          const uniqueItems = res.data.filter(
            (newItem: any) =>
              !prevItems.some((existingItem) => existingItem.id === newItem.id)
          );
          return [...prevItems, ...uniqueItems];
        });
        setPagination(res.data.pagination);
        console.log(res.data);
      }, 1500);

      if (pagination?.current === pagination?.total) setHasMore(true);

      //scroll top top of page
    };

    fetchMoreData();
  }, [page, photoOrder]);

  return { items, pagination, isLoading, lastItemRef, hasMore };
}
