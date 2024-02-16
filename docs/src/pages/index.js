import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import Translate, { translate } from "@docusaurus/Translate";
import styles from "./index.module.css";

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx("hero hero--primary", styles.heroBanner)}>
            <div className="container">
                <img src="img/logo.svg" width={100} height={100} alt="WCS Logo" className={styles.heroLogo} />
                <h1 className="hero__title">{siteConfig.title}</h1>
                <p className="hero__subtitle">
                    <Translate id="website.tagLine">A flexible combat system framework</Translate>
                </p>
                <div className={styles.buttons}>
                    <Link className="button button--secondary button--lg" to="/docs/intro">
                        <Translate id="startButton.text">Get Started</Translate>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={translate({
                message: `${siteConfig.title} - Combat System Framework`,
                id: "homepage.shortTitle",
            })}
            description={translate({
                message: "Build your advanced combat systems with ease.",
                id: "homepage.shortDesc",
            })}
        >
            <HomepageHeader />
            <main>
                <HomepageFeatures />
            </main>
        </Layout>
    );
}
