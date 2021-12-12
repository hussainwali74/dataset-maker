import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({ type: String, example: 'hussainadmin@dsmaker.com' })
    email: string;

    @ApiProperty({ type: String, description: "password", example: 'hussainadmin' })
    password: string;
}
