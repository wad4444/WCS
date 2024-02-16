/* eslint-disable no-undef */
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Translate, { translate } from "@docusaurus/Translate";

const FeatureList = [
    {
        title: translate({
            message: "Easy to Use",
            id: "feature1.title",
        }),
        Svg: require("@site/static/img/plug.svg").default,
        description: (
            <Translate id="feature1.desc">
                {`WCS was created with simplicity in mind, covering every possible aspect of a combat system and providing\nuseful abstractions for them`}
            </Translate>
        ),
    },
    {
        title: translate({
            message: "Flexible and abstract",
            id: "feature2.title",
        }),
        Svg: require("@site/static/img/settings.svg").default,
        description: (
            <Translate id="feature2.desc">
                {`WCS is very flexible and will fullfil all your needs, hiding tedious stuff like replication and ability \nmanagement inside.`}
            </Translate>
        ),
    },
    {
        title: translate({
            message: "Made with Typescript",
            id: "feature3.title",
        }),
        Svg: require("@site/static/img/wires1.svg").default,
        description: (
            <Translate id="feature3.desc">
                {`WCS is made using Typescript & Roblox-ts so it supports typescript natively. However, it also provides \nthe luau types for people who don't use TS.`}
            </Translate>
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
