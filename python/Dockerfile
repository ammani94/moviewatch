FROM python:3.11-slim as builder

WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends wget unzip firefox-esr && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN useradd -m appuser

USER appuser
RUN pip install --user -r requirements.txt

USER root
RUN wget https://github.com/mozilla/geckodriver/releases/download/v0.36.0/geckodriver-v0.36.0-linux64.tar.gz -O /tmp/geckodriver.tar.gz && \
    tar -xvzf /tmp/geckodriver.tar.gz -C /tmp && \
    chmod +x /tmp/geckodriver && \
    rm /tmp/geckodriver.tar.gz

FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends firefox-esr && \
    rm -rf /var/lib/apt/lists/*

RUN useradd -m appuser

COPY --from=builder /tmp/geckodriver /usr/local/bin/geckodriver
RUN chmod +x /usr/local/bin/geckodriver && \
    chown appuser:appuser /usr/local/bin/geckodriver

COPY --from=builder /home/appuser/.local /home/appuser/.local

RUN chown -R appuser:appuser /home/appuser/.local

COPY . .

USER appuser
ENV PATH="/home/appuser/.local/bin:${PATH}"

CMD ["bash"]