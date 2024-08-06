
import styles from "./styles.module.css";

import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { CategorySection } from "~/components/common/Section/CategorySection";
import { PopularDishSection } from "~/components/common/Section/PopularDishSection";
import { RecentOrderSection } from "~/components/common/Section/RecentOrderSection";
import { DishCard } from "~/components/specific/Dish/DishCard";
import { SearchDish } from "~/components/specific/SearchDish";
import useClearSearchData from "~/hooks/useClearSearchData";
import { useResponsiveLimitItem } from "~/hooks/useResponsiveLimitItem";

export const Dashboard = () => {
    const dishes = useSelector((state: any) => state.searchDish)
    const { isXs, isSm, isMd, isLg, isXl } = useResponsiveLimitItem()
    const categoryLimit = isXs ? 4 : isSm ? 6 : isMd ? 8 : isLg ? 10 : isXl ? 12 : 4
    const dishLimit = isXs ? 2 : isSm ? 4 : isMd ? 6 : isLg ? 8 : isXl ? 10 : 2
    useClearSearchData()
    return (
        <>
            <div className={`${styles["header-section"]}`}>
                <span className={`${styles["header-title"]}`}>Hello, Trung Le</span>
                <SearchDish />
            </div>

            {dishes.data === null ?
                <>
                    <img style={{ width: "100%" }} src="/BannerMain.png" />
                    <CategorySection limit={categoryLimit} />
                    <PopularDishSection limit={dishLimit} />
                    <RecentOrderSection limit={dishLimit} />
                </>
                :
                dishes.data.length > 0 ?
                    <Grid container spacing={2} rowSpacing={2}>
                        {dishes.data.map((dish: any) => {
                            return (<Grid item xs={12} sm={6} md={3} lg={4} xl={3} key={dish._id}>
                                <DishCard
                                    _id={dish._id}
                                    itemSold={0}
                                    isActive={false}
                                    discount={0}
                                    name={dish.name}
                                    price={dish.price}
                                    description={""}
                                    image={dish.image}
                                    category={""} />
                            </Grid>)
                        })}
                    </Grid>
                    :
                    <p>No dishes found.</p>
            }
        </>
    );
};
