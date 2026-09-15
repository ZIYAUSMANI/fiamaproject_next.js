import * as Yup from 'yup';

const NAME_REGEX = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
const PHONE_REGEX = /^\+?[0-9\s().-]{7,20}$/;
const ZIP_REGEX = /^[A-Za-z0-9][A-Za-z0-9\s-]{2,9}$/;

const formValidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .trim()
        .required('First name is required')
        .matches(
            NAME_REGEX,
            'First name can only contain letters'
        )
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name cannot exceed 50 characters'),


    lastName: Yup.string()
        .trim()
        .required('Last name is required')
        .matches(
            NAME_REGEX,
            'Last name can only contain letters, spaces, hyphens and apostrophes'
        )
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name cannot exceed 50 characters'),


    name: Yup.string()
        .trim()
        .required('Name is required')
        .matches(
            NAME_REGEX,
            'Name can only contain letters'
        )
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name cannot exceed 100 characters'),

    displayName: Yup.string()
        .trim()
        .required('Display name is required')
        .min(2, 'Display name must be at least 2 characters')
        .max(50, 'Display name cannot exceed 50 characters'),

    email: Yup.string()
        .trim()
        .required("Email is required")
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            "Please enter a valid email address"),

    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(128, 'Password cannot exceed 128 characters')
        .required('Password is required'),

    currentPassword: Yup.string()
        .required('currentPassword is required')
        .max(128, 'Password cannot exceed 128 characters'),

    newPassword: Yup.string()
        .max(128, 'Password cannot exceed 128 characters')
        .when('currentPassword', {
            is: (value) => Boolean(value?.trim()),
            then: (schema) =>
                schema
                    .required(
                        'New password is required when changing your password'
                    )
                    .min(8, 'New password must be at least 8 characters')
                    .test(
                        'different-from-current',
                        'New password must be different from your current password',
                        function (value) {
                            return value !== this.parent.currentPassword;
                        }
                    ),
            otherwise: (schema) => schema.notRequired(),
        }),

    confirmPassword: Yup.string()
        .when(['newPassword', 'password'], {
            is: (newPassword, password) =>
                Boolean(newPassword) || Boolean(password),

            then: (schema) =>
                schema
                    .required('Please confirm your password')
                    .oneOf(
                        [Yup.ref('newPassword'), Yup.ref('password')],
                        'Passwords must match'
                    ),

            otherwise: (schema) => schema.notRequired(),
        }),

    phone: Yup.string()
        .trim()
        .matches(
            PHONE_REGEX,
            'Please enter a valid phone number'
        )
        .required('Phone number is required'),

    couponCode: Yup.string()
        .trim()
        .required('Please enter a coupon code')
        .min(2, 'Coupon code is too short')
        .max(50, 'Coupon code cannot exceed 50 characters'),

    companyName: Yup.string()
        .trim()
        .max(100, 'Company name cannot exceed 100 characters')
        .notRequired(),

    companyAddress: Yup.string()
        .trim()
        .max(250, 'Company address cannot exceed 250 characters')
        .notRequired(),

    country: Yup.string()
        .trim()
        .required('Please select a country'),

    address: Yup.string()
        .trim()
        .min(5, 'Please enter a valid address')
        .max(250, 'Address cannot exceed 250 characters')
        .required('Address is required'),

    apartment: Yup.string()
        .trim()
        .max(100, 'Apartment/unit cannot exceed 100 characters')
        .notRequired(),

    city: Yup.string()
        .trim()
        .min(2, 'City must be at least 2 characters')
        .max(100, 'City cannot exceed 100 characters')
        .required('City is required'),

    state: Yup.string()
        .trim()
        .min(2, 'State must be at least 2 characters')
        .max(100, 'State cannot exceed 100 characters')
        .required('State is required'),

    zip: Yup.string()
        .trim()
        .matches(
            ZIP_REGEX,
            'Please enter a valid ZIP/postal code'
        )
        .required('ZIP/postal code is required'),

    createAccount: Yup.boolean()
        .default(false),

    orderNotes: Yup.string()
        .trim()
        .max(1000, 'Order notes cannot exceed 1000 characters')
        .notRequired(),

    marketingConsent: Yup.boolean()
        .oneOf(
            [true],
            "You must accept marketing consent to continue"
        ),

    termsConsent: Yup.boolean()
        .oneOf(
            [true],
            'You must accept the privacy policy and terms to continue'
        ),
    createAccount: Yup.boolean()
        .oneOf(
            [true],
            'You must accept create account consent to continue'
        ),

});

export default formValidationSchema;