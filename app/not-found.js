import Link from "next/link";

const NotFound404 = () => {
    return (
        <div className="text-dark">
            <div className="d-flex align-items-center justify-content-center py-5 px-2">
                <div className="text-center">
                    <h1 className="display-1 fw-bold text-primary">404</h1>
                    <p className="fs-2 fw-medium mt-4 text-moregray">Oops! Page not found</p>
                    <p className="mt-4 mb-5 text-gray">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <Link href="/" className="btn btn-primary fw-semibold rounded-pill px-4 py-2 custom-btn">
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    )
};
export default NotFound404;

