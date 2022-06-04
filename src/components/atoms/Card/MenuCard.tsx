import styles from "../../../sass/components/Card.module.scss";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function MenuCard(): JSX.Element {
  const [windowLoaded, setWindowLoaded] = useState(false);

  useEffect(() => {
    if (window !== undefined) {
      setWindowLoaded(true);
    }
  }, []);

  return (
    <motion.div className={styles["menu-card-wrapper"]}>
      {windowLoaded && (
        <img
          src={
            window.innerWidth > 1200
              ? "/assets/logo.svg"
              : "/assets/mobile_logo.svg"
          }
          alt="logo"
        />
      )}
    </motion.div>
  );
}
