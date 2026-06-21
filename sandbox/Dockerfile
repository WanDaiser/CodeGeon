FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN groupadd --system codequest \
    && useradd --system --gid codequest --create-home --home-dir /home/codequest codequest

WORKDIR /runner

RUN mkdir -p /runner/tmp \
    && chown -R codequest:codequest /runner

USER codequest

CMD ["python", "--version"]
