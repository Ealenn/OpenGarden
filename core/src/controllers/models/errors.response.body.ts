import { ApiProperty } from '@nestjs/swagger';

export class ErrorsRequestMessageBody {
  @ApiProperty()
  target: Record<string, string>;

  @ApiProperty()
  value: Record<string, string> | string;

  @ApiProperty()
  property: string;

  @ApiProperty({ isArray: true, type: ErrorsRequestMessageBody })
  children: ErrorsRequestMessageBody[];

  @ApiProperty()
  constraints: Record<string, string>;
}

export class ErrorsRequestBody {
  @ApiProperty()
  statusCode: number;

  @ApiProperty({ isArray: true, type: ErrorsRequestMessageBody })
  messages: ErrorsRequestMessageBody[];

  @ApiProperty()
  error: string;
}
