from pathlib import Path


def test_python_ci_workflow_exists():
    workflow = Path('.github/workflows/python-ci.yml')

    assert workflow.exists(), 'Python CI workflow file should exist'


def test_python_ci_workflow_contains_expected_sections():
    workflow_text = Path('.github/workflows/python-ci.yml').read_text(encoding='utf-8')

    assert 'name: Python CI' in workflow_text
    assert 'name: Build package' in workflow_text
    assert 'python-version:' in workflow_text
    assert 'actions/download-artifact@v4' in workflow_text
    assert 'actions/upload-artifact@v4' in workflow_text
    assert 'DEPLOY_TOKEN' in workflow_text