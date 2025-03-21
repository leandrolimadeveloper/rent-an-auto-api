interface IUserResponseDTO {
    id: string;
    name: string;
    email: string;
    avatar: string;
    driver_license: string;
    avatarUrl(): string;
}

export { IUserResponseDTO }
