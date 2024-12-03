import {useNavigate, useParams} from "react-router-dom";
import { Card } from "@consta/uikit/Card";
import { Text } from "@consta/uikit/Text";
import { Loader } from "@consta/uikit/Loader";
import './ServiceDetailPage.css';
import {useEffect, useState} from "react";
import {getToken} from "../../store/token";

const ServiceDetailPage = () => {
    const [service, setService] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = getToken();

    if (!userToken) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setError('');

    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(`https://673423afa042ab85d1190055.mockapi.io/api/v1/services/${id}`);
        if (!response.ok) {
          throw new Error('Не удалось загрузить услугу');
        }

        const serviceData = await response.json();
        setService(serviceData);
      } catch (err) {
        setError(err.message || 'Произошла ошибка при загрузке услуги');
      } finally {
        setLoading(false);
      }
    };
    fetchServiceDetails();
  }, [navigate]);

    if (loading) {
        return (
            <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
                <Loader size={'m'} />
            </div>
        );
    }

    if (error) {
        return <div>Error: {service.error.message}</div>;
    }

    return (
        <div className="service-detail-container">
            <Card verticalSpace="m" horizontalSpace="xl" form="round" className="rounded-card-service-detail-page">
                <Text size="l" weight="bold" align="center">{service.name}</Text>
                {service.image && <img src={service.image} alt={service.name} className="service-detail-image" />}
                <Text align="left">{service.description}</Text>
            </Card>
        </div>
    );
}

export default ServiceDetailPage;
