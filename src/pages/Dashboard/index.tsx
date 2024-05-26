import { HeaderSection } from "~/components/Section/HeaderSection/index";
import { CategorySection } from "~/components/Section/CategorySection/index";
import { PopularDishSection } from "~/components/Section/PopularDishSection/index";
import { RecentOrderSection } from "~/components/Section/RecentOrderSection/index";
import { useSelector } from "react-redux";
import { PopularDish } from "~/features/PopularDish/PopularDish";
import { Grid } from "@mui/material";

export const Dashboard = () => {
  const dishes = useSelector((state: any) => state.searchDishes)
  return (
    <>
      <HeaderSection />

      {dishes.data === null ?
        <>
          <img style={{ width: "100%" }} src="/BannerMain.png" />
          <CategorySection />
          <PopularDishSection />
          <RecentOrderSection />
        </>
        :
        dishes.data.length > 0 ?
          <Grid container spacing={2} rowSpacing={2}>
            {dishes.data.map((dish: any) => {
              return (<Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={dish._id}>
                <PopularDish
                  itemSold={0}
                  is_active={false}
                  discount={0}
                  created_at={""}
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
      }``
    </>
  );
};
