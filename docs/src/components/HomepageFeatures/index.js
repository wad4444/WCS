/* eslint-disable no-undef */
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
    {
        title: "Easy to Use",
        Svg: require("@site/static/img/plug.svg").default,
        description: (
            <>
                WCS was created with simplicity in mind, covering every possible aspect of a combat system and providing
                useful abstractions for them
            </>
        ),
    },
    {
        title: "Flexible and abstract",
        Svg: require("@site/static/img/settings.svg").default,
        description: (
            <>
                WCS is very flexible and will fullfil all your needs, hiding tedious stuff like replication and ability
                management inside.
            </>
        ),
    },
    {
        title: "Made with Typescript",
        Svg: require("@site/static/img/wires1.svg").default,
        description: (
            <>
                WCS is made using Typescript & Roblox-ts so it supports typescript natively. However, it also provides
                the luau types for people who don't use TS.
            </>
        ),
    },
];

function Feature({ Svg, title, description }) {
    return (
        <div className={clsx("col col--4")}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img" />
            </div>
            <div className="text--center padding-horiz--md">
                <Heading as="h3">{title}</Heading>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
