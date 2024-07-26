import { HeaderSection } from "~/components/Section/HeaderSection/index";
import { CategorySection } from "~/components/Section/CategorySection/index";
import { PopularDishSection } from "~/components/Section/PopularDishSection/index";
import { RecentOrderSection } from "~/components/Section/RecentOrderSection/index";
import { useSelector } from "react-redux";
import { Dish } from "~/components/Dish";
import { Grid } from "@mui/material";
import { useResponsiveLimitItem } from "~/hooks/useResponsiveLimitItem";

export const Dashboard = () => {
  const dishes = useSelector((state: any) => state.searchDishes)
  const { isXs, isSm, isMd, isLg, isXl } = useResponsiveLimitItem()
  const categoryLimit = isXs ? 4 : isSm ? 6 : isMd ? 8 : isLg ? 10 : isXl ? 12 : 4
  const dishLimit = isXs ? 2 : isSm ? 4 : isMd ? 6 : isLg ? 8 : isXl ? 10 : 2
  return (
    <>
      <HeaderSection />

      {dishes.data === null ?
        <>
          <img style={{ width: "100%" }} src="/BannerMain.png" />
          <CategorySection limit={categoryLimit}/>
          <PopularDishSection limit={dishLimit} />
          <RecentOrderSection limit={dishLimit}/>
        </>
        :
        dishes.data.length > 0 ?
          <Grid container spacing={2} rowSpacing={2}>
            {dishes.data.map((dish: any) => {
              return (<Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={dish._id}>
                <Dish
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
