export interface confirmPassword {
    password: string;
    confirm: string;
}

export interface RegistrValue {
    email: string;
    password: string;
}

export interface Values {
    email: string;
    password: string;
    confirm: string;
    code: string;
}

export type СreateFeedback = {
    rating: number;
    message: string;
};

export type Feedback = {
    id: string;
    fullName: string;
    imageSrc: string;
    message: string;
    rating: number;
    createdAt: string;
};

export type GetFeedbacksResponse = Feedback[];
