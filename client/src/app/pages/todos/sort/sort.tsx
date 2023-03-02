import React, { ChangeEvent } from "react";
import { useAppDispatch } from "../../../hooks";
import { changeCategoryFilter, changeSortFilter } from "../slice";
import { Category, SortVariant } from "../types";

const SortingForm = () => {
  const dispatch = useAppDispatch();

  const changeCategoryHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeCategoryFilter(Number(e.currentTarget.value)));
  };

  const changeSortHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeSortFilter(Number(e.currentTarget.value)));
  };

  return (
    <form>
      <select onChange={(e) => changeCategoryHandler(e)}>
        <option value={Category.Date}>Date</option>
        <option value={Category.Status}>Status</option>
      </select>
      <select onChange={(e) => changeSortHandler(e)}>
        <option value={SortVariant.Ascending}>Ascending</option>
        <option value={SortVariant.Descending}>Descending</option>
      </select>
    </form>
  );
};

export default SortingForm;
