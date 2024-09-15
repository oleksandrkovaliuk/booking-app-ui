import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Slider } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useGetVerifiedListingsQuery } from "@/store/api/endpoints/listings/getVerifiedListings";

import { AssignNewQueryParams } from "@/helpers/paramsManagment";

import { SEARCH_PARAM_KEYS } from "@/layout/header/_lib/enums";
import { PriceLimit } from "@/app/manage/_components/createForm/content/enum";

import styles from "./priceRangeSelection.module.scss";

export const PriceRangeSelection: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const { data: listings, isSuccess } = useGetVerifiedListingsQuery();

  const priceMinRange =
    isSuccess &&
    listings
      ?.map((listing) => listing.price)
      .sort((a, b) => Number(a) - Number(b))[0];

  const priceMaxRange =
    isSuccess &&
    Number(
      listings
        ?.map((listing) => listing.price)
        .sort((a, b) => Number(b) - Number(a))[0]
    );

  const [priceRangeValue, setPriceRangeValue] = useState<number[]>([
    Number(priceMinRange),
    Number(priceMaxRange),
  ]);

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRangeValue(value as number[]);
    AssignNewQueryParams({
      updatedParams: {
        [SEARCH_PARAM_KEYS.SEARCH_PRICE_RANGE]: JSON.stringify(value),
      },
      pathname,
      params,
      router,
    });
  };
  const handlePriceRangeManualChange = (
    type: "min" | "max",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const price = e.target.value.split(",").join("");

    if (isNaN(Number(price))) {
      toast("🤔 It looks like you trying to enter non numeric character.", {
        position: "top-center",
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
      return;
    }

    if (Number(price) > PriceLimit.MAX) {
      toast("🤔 Oppss . Price can not be higher then 30.000$/night.", {
        position: "top-center",
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
      return;
    }

    if (type === "min") {
      setPriceRangeValue([Number(price), priceRangeValue[1]]);
      AssignNewQueryParams({
        updatedParams: {
          [SEARCH_PARAM_KEYS.SEARCH_PRICE_RANGE]: JSON.stringify([
            Number(price),
            priceRangeValue[1],
          ]),
        },
        pathname,
        params,
        router,
      });
    } else {
      setPriceRangeValue([priceRangeValue[0], Number(price)]);
      AssignNewQueryParams({
        updatedParams: {
          [SEARCH_PARAM_KEYS.SEARCH_PRICE_RANGE]: JSON.stringify([
            priceRangeValue[0],
            Number(price),
          ]),
        },
        pathname,
        params,
        router,
      });
    }
  };

  useEffect(() => {
    const savedPriceRange = params.get(SEARCH_PARAM_KEYS.SEARCH_PRICE_RANGE);
    if (savedPriceRange) {
      const [min, max] = JSON.parse(savedPriceRange);
      setPriceRangeValue([Number(min), Number(max)]);
    } else if (isSuccess && !savedPriceRange) {
      setPriceRangeValue([Number(priceMinRange), Number(priceMaxRange)]);
    }
  }, [isSuccess, params, priceMaxRange, priceMinRange]);
  return (
    <div className={styles.filter_price_range}>
      <Slider
        size="md"
        step={1}
        showTooltip
        isDisabled={
          priceRangeValue[0] === priceRangeValue[1] ||
          !priceRangeValue[0] ||
          !priceRangeValue[1] ||
          listings!.length === 1
        }
        color="primary"
        minValue={Number(priceMinRange)}
        maxValue={Number(priceMaxRange)}
        value={priceRangeValue}
        onChange={(value: number[] | number) => {
          handlePriceRangeChange(value as number[]);
        }}
        formatOptions={{ style: "currency", currency: "USD" }}
        tooltipValueFormatOptions={{
          style: "currency",
          currency: "USD",
        }}
        className={styles.price_range_slider}
      />

      <div className={styles.price_range_preview_container}>
        <div className={styles.price_range_preview_block}>
          <label
            htmlFor="price_min"
            className={styles.price_range_preview_label}
          >
            Minimun
          </label>
          <div className={styles.price_range_preview_input_wrap}>
            <span className={styles.price_range_preview_currency}>$</span>
            <input
              type="text"
              aria-label="price_min"
              inputMode="numeric"
              id="price_min"
              style={{
                maxWidth: `${priceRangeValue[0].toLocaleString().length}ch`,
              }}
              className={styles.price_range_preview_input}
              value={Number(priceRangeValue[0]).toLocaleString()}
              onChange={(e) => handlePriceRangeManualChange("min", e)}
            />
          </div>
        </div>
        <div className={styles.price_range_preview_block}>
          <label
            htmlFor="price_max"
            className={styles.price_range_preview_label}
          >
            Maximum
          </label>
          <div className={styles.price_range_preview_input_wrap}>
            <span className={styles.price_range_preview_currency}>$</span>
            <input
              type="text"
              aria-label="price_max"
              inputMode="numeric"
              id="price_max"
              className={styles.price_range_preview_input}
              style={{
                maxWidth: `${priceRangeValue[1].toLocaleString().length}ch`,
              }}
              value={Number(priceRangeValue[1]).toLocaleString()}
              onChange={(e) => handlePriceRangeManualChange("max", e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
