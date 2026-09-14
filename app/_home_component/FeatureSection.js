import { featureData } from "@/data/bannerdata";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";


const FeatureSection = () => {
    return (
        <section className="feature">
            <Container className="feature-area">
                <Row className="feature-wrap g-0">
                    {featureData.map((item) => (
                        <Col key={item.id} xs={12} md={6} lg={3}>
                            <div className="feature-item text-center text-md-start justify-content-center justify-content-md-start">
                                <div className="feature-icon">
                                    <Image
                                        src={item.icon}
                                        alt={item.title}
                                        width={50}
                                        height={50}
                                    />
                                </div>

                                <div className="feature-info">
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default FeatureSection;