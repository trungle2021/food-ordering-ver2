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

      {dishes && dishes.data.length > 0 ? dishes.data.map((dish: any) => {

        return <Grid container spacing={2} key={dish._id} rowSpacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
            <PopularDish
              itemSold={0}
              is_active={false}
              discount={0}
              created_at={""}
              name={dish.name}
              price={0}
              description={""}
              image={dish.image}
              category={""} />

          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
            <PopularDish
              itemSold={0}
              is_active={false}
              discount={0}
              created_at={""}
              name={dish.name}
              price={0}
              description={""}
              image={dish.image}
              category={""} />

          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
            <PopularDish
              itemSold={0}
              is_active={false}
              discount={0}
              created_at={""}
              name={dish.name}
              price={0}
              description={""}
              image={dish.image}
              category={""} />

          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
            <PopularDish
              itemSold={0}
              is_active={false}
              discount={0}
              created_at={""}
              name={dish.name}
              price={0}
              description={""}
              image={dish.image}
              category={""} />

          </Grid>
        </Grid>
      }) : (<>
        <img style={{ width: "100%" }} src="/BannerMain.png" />
        <CategorySection />
        <PopularDishSection />
        <RecentOrderSection />
      </>)}

    </>
  );
};
