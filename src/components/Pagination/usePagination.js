import {useMemo} from 'react';

export const DOTS = '...';

const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({length}, (_, idx) => idx + start);
};


export const usePagination = ({
                                  totalCount,
                                  pageSize,
                                  siblingCount = 1,
                                  currentPage,
                                  customPageNumber
                              }) => {
    return useMemo(() => {
        const totalPageCount = customPageNumber ? totalCount : Math.ceil(totalCount / pageSize);

        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPageCount
        );

        const shouldShowCenterDots = (currentPage < 3 || currentPage > totalPageCount - 2)
        if (shouldShowCenterDots) {
            let leftRange = range(1, 3);
            let rightRange = range(totalPageCount - 2, totalPageCount);
            return [...leftRange, DOTS, ...rightRange];
        }

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPageCount];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
            );
            return [firstPageIndex, DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalCount, pageSize, siblingCount, currentPage]);
};
