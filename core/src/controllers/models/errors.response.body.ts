import { ApiProperty } from '@nestjs/swagger';

export class ErrorsRequestMessageBody {
  @ApiProperty()
  target: Record<string, string>;

  @ApiProperty()
  value: Record<string, string> | string;

  @ApiProperty()
  property: string;

  @ApiProperty({ isArray: true })
  children: Record<string, string>[];

  @ApiProperty()
  constraints: Record<string, string>;
}

export class ErrorsRequestBody {
  @ApiProperty()
  statusCode: number;

  @ApiProperty({ isArray: true, type: ErrorsRequestMessageBody })
  message: ErrorsRequestMessageBody[];

  @ApiProperty()
  error: string;
}
